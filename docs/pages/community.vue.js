var Community = {
  data: () => ({
    categories: communities,
  }),
  template: `
    <div class="community-wrapper">
      <div class="community-nav sticky">
        <ul>
          <li class="tag-h2" v-for="category in categories">
            <a :href="'#'+category.slug">{{category.name}}</a>
          </li>
        </ul>
      </div>

      <div class="community-content">

        <div v-for="category in categories">
          <h2 :id="category.slug">{{category.name}}</h2>
          <ul>
            <li v-for="item in category.items">
              <img v-if="!!item.image" :src="item.image" class="pic" />
              <a :href="item.url">{{item.name}}</a>
              <p>{{item.description}}</p>
            </li>
          </ul>
        </div>

        <br />
        <br />
        <br />
        
        <p>
          Are we missing something? 
          <a href="https://github.com/MadeInA2/madeina2" target="_blank">Add your group here</a>!
        </p>
      </div>
    </div>
  `,
}