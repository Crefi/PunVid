
<script lang="ts">
  export let user = { name: 'John Doe', avatar: 'punpun.png' };
</script>

<style lang="scss">
  .profile {
    display: flex;
    align-items: center;
    padding: 1rem;
  }
  .profile__avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 1rem;
  }
</style>

<div class="profile">
  <img class="profile__avatar" src={user.avatar} alt={user.name} />
  <p>{user.name}</p>
</div>
