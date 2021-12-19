
<template>
    <div>
        <ul  class="nav">
          <li><img src="../assets/logo.png" /></li>
          <li class="nav-links">Guide</li>
          <li class="nav-links">Config</li>
          <li class="nav-links">Plugins</li>
          <li class="nav-links">Links</li>
          <li class="nav-links">Languages</li>
          <li class="nav-links">Github</li>
            <li class="nav-links-search">
              <input type="search" placeholder="Search" class="fa fa-keyboard" />
              <i class="fa fa-keyboard icon"></i>
              <button @click="event()" type="submit"><img src="../assets/search.png" /></button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import '../lib/css/Navbar/Navbar.scss';
import axios from 'axios';

const searchLink = "http://localhost:1337/search/";

export default {
//   data() {
//     return {
//       name: ''
//     }
//   },
//   methods: {
//     event() {
//       console.log('Hello');
//
//       const search = {
//         searchTerm: this.name
//       }
//
//       axios({
//         method: 'post',
//         url: searchLink,
//         data: JSON.stringify(search)
//       }).then((response) => {
//         console.log(response);
//       }).catch((err) => {
//         console.error(err);
//       });
//     }
//   }
// }
</script>
