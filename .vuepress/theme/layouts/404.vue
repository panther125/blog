<template>
  <div class="not-find-container">
    <img src="/404.jfif" alt="404" class="not-find-img" />
    <div class="not-find-btn">
       <router-link to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {},
};
</script>

<style>
.not-find-container {
  width: 100%;
  height: 90vh;
  margin: 0px;
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.not-find-img {
  width: 350px;
  height: 380px;
}

.not-find-btn{
   margin-top: 50px;
   width: 180px;
   height: 40px;
   border: 1px solid #2B9ACA;
   text-align: center;
   line-height: 40px;
   border-radius: 5px;
   cursor:pointer;
}

a{
  text-decoration: none;
}

</style>
