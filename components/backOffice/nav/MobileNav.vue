<template>
    <div>
      <header class="mobile-header">
        <span class="logo-lolpeaks">L<span class="span-amarillo">O</span>LPEA<span class="span-amarillo">KS</span></span>
        <button class="hamburger-btn" @click="toggleSidebar">
          <svg v-if="!isSidebarOpen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M18 6L6 18M6 6l12 12" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </header>
      <transition name="slide">
        <aside v-if="isSidebarOpen" class="sidebar-mobile">
          <nav>
            <ul>
              <li>
                <NuxtLink to="/admin/" @click="closeSidebar">
                  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="icon"><path d="m197.332031 0h-160c-20.585937 0-37.332031 16.746094-37.332031 37.332031v96c0 20.589844 16.746094 37.335938 37.332031 37.335938h160c20.589844 0 37.335938-16.746094 37.335938-37.335938v-96c0-20.585937-16.746094-37.332031-37.335938-37.332031zm0 0" fill="#000000" style="fill: rgb(255, 255, 255);"></path><path d="m197.332031 213.332031h-160c-20.585937 0-37.332031 16.746094-37.332031 37.335938v224c0 20.585937 16.746094 37.332031 37.332031 37.332031h160c20.589844 0 37.335938-16.746094 37.335938-37.332031v-224c0-20.589844-16.746094-37.335938-37.335938-37.335938zm0 0" fill="#000000" style="fill: rgb(255, 255, 255);"></path><path d="m474.667969 341.332031h-160c-20.589844 0-37.335938 16.746094-37.335938 37.335938v96c0 20.585937 16.746094 37.332031 37.335938 37.332031h160c20.585937 0 37.332031-16.746094 37.332031-37.332031v-96c0-20.589844-16.746094-37.335938-37.332031-37.335938zm0 0" fill="#000000" style="fill: rgb(255, 255, 255);"></path><path d="m474.667969 0h-160c-20.589844 0-37.335938 16.746094-37.335938 37.332031v224c0 20.589844 16.746094 37.335938 37.335938 37.335938h160c20.585937 0 37.332031-16.746094 37.332031-37.335938v-224c0-20.585937-16.746094-37.332031-37.332031-37.332031zm0 0" fill="#000000" style="fill: rgb(255, 255, 255);"></path></svg>
                  Dashboard
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/admin/cron/" @click="closeSidebar">
                  <svg id="Layer_1" enable-background="new 0 0 20 20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="icon"><g fill="rgb(0,0,0)"><path d="m8.4.5h11.6v2.1h-11.6z" fill="rgb(0,0,0)" style="fill: rgb(255, 255, 255);"></path><path d="m8.4 5.8h11.6v2.1h-11.6z" fill="rgb(0,0,0)" style="fill: rgb(255, 255, 255);"></path><path d="m8.4 12.1h11.6v2.1h-11.6z" fill="rgb(0,0,0)" style="fill: rgb(255, 255, 255);"></path><path d="m8.4 17.4h11.6v2.1h-11.6z" fill="rgb(0,0,0)" style="fill: rgb(255, 255, 255);"></path><path d="m3.7 12.1c-2 0-3.7 1.7-3.7 3.7s1.7 3.7 3.7 3.7 3.7-1.7 3.7-3.7-1.7-3.7-3.7-3.7zm0 5.3c-.9 0-1.6-.7-1.6-1.6s.7-1.6 1.6-1.6 1.6.7 1.6 1.6-.7 1.6-1.6 1.6z" fill="rgb(0,0,0)" style="fill: rgb(255, 255, 255);"></path><path d="m3.7.5c-2 0-3.7 1.7-3.7 3.7s1.7 3.7 3.7 3.7 3.7-1.7 3.7-3.7-1.7-3.7-3.7-3.7zm0 5.3c-.9 0-1.6-.7-1.6-1.6s.7-1.6 1.6-1.6 1.6.7 1.6 1.6-.7 1.6-1.6 1.6z" fill="rgb(0,0,0)" style="fill: rgb(255, 255, 255);"></path></g></svg>
                  CronJobs
                </NuxtLink>
                <ul>
                  <li>
                    <NuxtLink to="/admin/cron/logs/" @click="closeSidebar">
                      <svg id="Layer_1" enable-background="new 0 0 450 450" viewBox="0 0 450 450" xmlns="http://www.w3.org/2000/svg" class="icon"><g><g><g id="XMLID_1_"><path d="m405.2 289.36h-360.4c-19.19 0-34.8 15.61-34.8 34.8v79.25c0 19.19 15.61 34.8 34.8 34.8h360.4c19.19 0 34.8-15.61 34.8-34.8v-79.25c0-19.19-15.61-34.8-34.8-34.8zm-246.4 123.44h-55.02c-2.81 0-5.09-2.28-5.09-5.09v-86.33c0-2.81 2.28-5.09 5.09-5.09s5.09 2.28 5.09 5.09v81.23h49.93c2.81 0 5.09 2.28 5.09 5.09 0 2.82-2.28 5.1-5.09 5.1zm92.81-40.43c0 21.88-17.8 39.67-39.68 39.67s-39.68-17.79-39.68-39.67v-17.17c0-21.88 17.8-39.68 39.68-39.68s39.68 17.8 39.68 39.68zm43.37 28.72h33.32c7.07 0 12.83-5.75 12.83-12.83v-11.97h-14.68c-2.81 0-5.09-2.27-5.09-5.09 0-2.81 2.28-5.09 5.09-5.09h19.78c2.81 0 5.09 2.28 5.09 5.09v17.07c0 12.7-10.33 23.02-23.02 23.02h-33.32c-12.69 0-23.02-10.32-23.02-23.02v-50.48c0-12.69 10.33-23.02 23.02-23.02h33.32c12.69 0 23.02 10.33 23.02 23.02 0 2.81-2.28 5.09-5.09 5.09s-5.09-2.28-5.09-5.09c0-7.07-5.76-12.83-12.83-12.83h-33.32c-7.07 0-12.83 5.76-12.83 12.83v50.48c-.01 7.07 5.75 12.82 12.82 12.82z" fill="#000000" style="fill: rgb(255, 255, 255);"></path><path d="m342.05 92.85c-21.81 0-39.55-17.74-39.55-39.55v-41.51h-203.2c-19.25 0-34.92 15.66-34.92 34.92v232.45h319.19v-186.31zm-28.67 151.32h-178.82c-2.81 0-5.09-2.28-5.09-5.09s2.28-5.09 5.09-5.09h178.83c2.82 0 5.09 2.28 5.09 5.09 0 2.8-2.27 5.09-5.1 5.09zm0-38.77h-178.82c-2.81 0-5.09-2.28-5.09-5.09s2.28-5.09 5.09-5.09h178.83c2.82 0 5.09 2.28 5.09 5.09s-2.27 5.09-5.1 5.09zm0-38.78h-178.82c-2.81 0-5.09-2.28-5.09-5.09s2.28-5.09 5.09-5.09h178.83c2.82 0 5.09 2.28 5.09 5.09s-2.27 5.09-5.1 5.09zm0-38.77h-178.82c-2.81 0-5.09-2.28-5.09-5.09s2.28-5.09 5.09-5.09h178.83c2.82 0 5.09 2.28 5.09 5.09s-2.27 5.09-5.1 5.09z" fill="#000000" style="fill: rgb(255, 255, 255);"></path><path d="m376.37 82.66h-34.32c-16.19 0-29.36-13.16-29.36-29.36v-34.3z" fill="#000000" style="fill: rgb(255, 255, 255);"></path><path d="m241.42 355.2v17.17c0 16.25-13.23 29.48-29.49 29.48-16.25 0-29.49-13.23-29.49-29.48v-17.17c0-16.26 13.24-29.49 29.49-29.49 16.26 0 29.49 13.23 29.49 29.49z" fill="#000000" style="fill: rgb(255, 255, 255);"></path></g></g></g></svg>
                      Logs
                    </NuxtLink>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </aside>
      </transition>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const isSidebarOpen = ref(false);
  
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
  };
  
  const closeSidebar = () => {
    isSidebarOpen.value = false;
  };
  
  watch(isSidebarOpen, (newVal) => {
    if (newVal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  </script>
  
  <style scoped>
  .mobile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:20px;
    background-color: #292929;
  }
  
  .hamburger-btn {
    background: none;
    border: none;
    cursor: pointer;
    z-index: 100;
  }
  
  .sidebar-mobile {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #292929;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding-top: 40px;
    overflow: hidden; 
    z-index: 10;
  }
  
  .sidebar-mobile nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 22px;
    flex-direction: column;
    margin-left: 20px;
    margin-top: 40px;
  }
  
  .sidebar-mobile nav ul li a {
    color: #fff;
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  
  .sidebar-mobile nav ul li a:hover {
    text-decoration: underline;
  }
  
  .sidebar-mobile nav ul ul {
    margin-left: 20px;
    margin-top: 20px;
  }
  
  .icon {
    margin-right: 8px;
    width: 20px;
    height: 20px;
  }
  
  .logo-lolpeaks {
    color: white;
    font-size: 26px;
    z-index: 100;
  }
  
  .span-amarillo {
    color: #FDBE3B;
  }
  
  .close-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
    margin-left: 20px;
    align-self: flex-end;
  }
  </style>
  