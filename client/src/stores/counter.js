import { ref, computed } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia';
import swal from 'sweetalert2'
import firebaseConfig from '../../firebaseConfig'
import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth'
firebaseConfig

const provider = new GithubAuthProvider()
const auth = getAuth()



const BASE_URL = "http://localhost:3000"

export const useRecipeStore = defineStore('useRecipeStore', {
  state: () => ({
    recipe: '',
    isLoggedIn: false,
    recipe: '',
    Category: '',
    random: '',
    meals: '',
    letter: '',
    recipeDb: '',
    findId: ''


  }),
  getters: {
    isAuthenticated: (state) => {
      return state.isLoggedIn;
    },
  },

  actions: {
    checkState() {
      if (localStorage.getItem("access_token")) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    },
    async handleRegister(name, email, password) {
      console.log('asdasdas')
      try {
        const { data } = await axios({
          method: "POST",
          url: `${BASE_URL}/register`,
          data: {
            name: name,
            email: email,
            password: password
          }
        })

        swal.fire({
          icon: 'success',
          title: 'Successfully register',

        })
        this.router.push('/')

      } catch (err) {
        console.log(err)
        swal.fire({
          icon: "warning",
          title: `${err.response.data.message}`,
          showConfirmButton: false,

        });
      }
    },
    async handleLogin(email, password) {
      console.log('asdasdad')
      try {
        const { data } = await axios({
          method: "POST",
          url: `${BASE_URL}/login`,
          data: {
            email: email,
            password: password
          }
        })
        swal.fire({
          icon: 'success',
          title: 'Successfully Login',
          timer: 1000
        })
        localStorage.setItem('access_token', data.token)


        this.isLoggedIn = true;
        console.log(this.isLoggedIn)
        this.router.push('/')



      } catch (error) {
        console.log(error)
        swal.fire({
          icon: "warning",
          title: `${error.response.data.message}`,
          showConfirmButton: false,
          timer: 1000,
        });

      }
    },
    async handleLogout() {
      try {
        localStorage.clear()
        this.isLoggedIn = false
        this.router.push({ name: 'login' })
      } catch (err) {
        console.log(err)
      }
    },
    async fetchCategory() {
      try {

        const { data } = await axios.get(`${BASE_URL}/meals/categories`)
        this.recipe = data.categories
        this.filteredCategory()

      } catch (error) {
        console.log(error)
      }
    },
    async filteredCategory(category) {

      try {

        const { data } = await axios.get(`${BASE_URL}/meals/category/${category}`)
        this.Category = data.meals
        console.log(data, 'as')

      } catch (error) {
        console.log(error)
      }
    },
    async mealsRecipe(name) {

      try {
        const { data } = await axios.get(`${BASE_URL}/meals/search/${name}`)
        this.meals = data.meals


        this.router.push(`/meals/search/${name}`)
      } catch (error) {
        console.log(error)
      }
    },
    async findByLetter(letter) {

      try {
        const { data } = await axios.get(`${BASE_URL}/meals/search/${letter}`)
        this.letter = data.meals


        this.router.push(`/meals/find/${letter}`)
      } catch (error) {
        console.log(error)
      }
    },
    async randomMeals() {
      try {
        const { data } = await axios.get(`${BASE_URL}/meals/random`)
        this.random = data.meals
      } catch (error) {
        console.log(error)
      }
    },
    async handleLoginWithFacebook(email, accessToken) {
      try {

        const { data } = await axios.post(`${BASE_URL}/auth/facebook`, {
          email,
          accessToken,
        });



      } catch (error) {
        console.log(error);
        swal.fire({
          icon: "warning",
          title: `${error.response.data.message}`,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    },
    async addRecipe(obj) {
      try {
        const { title, description, instructions, prepTime, cookTime, servings, categoryId } = obj


        console.log('ini di counter.js')
        const { data } = await axios({
          method: "POST",
          url: `${BASE_URL}/recipeDb`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            title: title,
            description: description,
            instructions: instructions,
            prepTime: prepTime,
            cookTime: cookTime,
            servings: servings,
            categoryId: categoryId

          }
        })
        console.log(data);


        swal.fire({
          icon: 'success',
          title: 'Successfully Create Recipe',

        })
        this.router.push('/recipe')
        this.getAllRecipe()

      } catch (err) {
        console.log(err)
        swal.fire({
          icon: "warning",
          title: `${err.response.data.message}`,
          showConfirmButton: false,

        });
      }
    },
    async getAllRecipe() {
      try {

        const { data } = await axios({
          method: "GET",
          url: `${BASE_URL}/recipe`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
        })
        this.recipeDb = data

      } catch (error) {
        console.log(error)
      }
    },
    async deleteRecipe(id) {
      try {
        const result = await swal.fire({
          title: 'Konfirmasi',
          text: 'Apakah Anda yakin ingin menghapus resep ini?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Hapus',
          cancelButtonText: 'Batal',
          reverseButtons: true
        });

        if (result.isConfirmed) {
          const { data } = await axios({
            method: 'DELETE',
            url: `${BASE_URL}/recipe/${id}`,
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          });

          // Tampilkan pesan sukses
          swal.fire({
            title: 'Sukses',
            text: 'Resep berhasil dihapus.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });

          // Refresh data resep setelah menghapus
          this.getAllRecipe();
        }
      } catch (err) {
        console.log(err);
        // Tampilkan pesan error
        swal.fire({
          title: 'Error',
          text: 'Terjadi kesalahan saat menghapus resep.',
          icon: 'error',
          timer: 2000,
          showConfirmButton: false
        });
      }
    },

    async donation() {
      console.log('ini donation')
      try {
        const { data } = await axios({
          url: `${BASE_URL}/donation`,
          method: 'post',

          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
      } catch (err) {
        console.log(err)
      }
    },

    async sendDonation() {
      try {

        const { data } = await axios({
          url: `${BASE_URL}/orders/midtrans-token`,
          method: "post",
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        const cb = this.donation;
        console.log(cb)
        window.snap.pay(data.token, {
          onSuccess: function (result) {
            /* You may add your own implementation here */
            // alert("payment success!"); console.log(result);
            cb()

          },
          onPending: function (result) {
            /* You may add your own implementation here */
            alert("wating your payment!"); console.log(result);
          },
          onError: function (result) {
            /* You may add your own implementation here */
            alert("payment failed!"); console.log(result);
          },
          onClose: function () {
            /* You may add your own implementation here */
            alert('you closed the popup without finishing the payment');
          }
        })
      } catch (err) {

      }
    },
    async getRecipe(id) {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${BASE_URL}/recipe/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },

        })
        this.findId = data.recipe
      } catch (err) {
        console.log(err)
      }



    },
    async editRecipe(id, title, description, instructions, prepTime, cookTime, servings, categoryId) {
      console.log('ini apa ya')
      try {


        const { data } = await axios.put(`${BASE_URL}/recipe/${id}`, {
          title: title,
          description: description,
          instructions: instructions,
          prepTime: prepTime,
          cookTime: cookTime,
          servings: servings,
          categoryId: categoryId
        }, {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        });

        console.log(data, 'test dong');

        swal.fire({
          icon: 'success',
          title: 'Successfully Edit Recipe',
        });

        this.getAllRecipe();
        this.router.push('/recipe');
      } catch (err) {
        console.log(err);

        swal.fire({
          icon: 'warning',
          title: `${err.response.data.message}`,
          showConfirmButton: false,
        });
      }
    },
    async handleGithubSignIn() {
      try {
        const result = await signInWithPopup(auth, provider)
        console.log(result)
       this.router.push('/')
      } catch (error) {
        console.log(error)
      }
    }

  }
});
