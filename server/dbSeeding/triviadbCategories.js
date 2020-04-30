const axios = require('axios');
const Category = require('../models/Category');

async function GetCateogries() {
  try {
    const res = await axios.get('https://opentdb.com/api_category.php');

    let categories = res.data.trivia_categories;

    categories = categories.map(x => {
      return {
        name: x.name
      }
    });

    const ids = await Category.CreateCategory(categories);

    console.log(ids);
  }
  catch(e) {
    throw e;
  }
}

GetCateogries()