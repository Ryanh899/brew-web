// Variables
const knex = require("./knex/knex");
const __ = require("lodash");

// Promotions Model
const Promotions = {
  // Gets all promotions within a city
  getPromotionsInCity: (city, cb) => {
    //knex join on promotion where city = the city
    knex("promotion")
      .leftJoin("business", "promotion.business_id", "business.id")
      .where("city", city)
      .then(result => {
        //map through result to make array of objects for markers
        let promotions = result.map(item => {
          return {
            promotion: [
              `${item.promotion_name}`,
              `${item.qtypeople}`,
              `${item.description}`
            ],
            name: item.business_name,
            address: `${item.address1} ${item.address2} ${item.city} ${item.state}, ${item.zip}`,
            latitude: item.latitude,
            longitude: item.longitude
          };
        });
        cb.json(promotions);
      })
      .catch(err => console.log(err));
  },

  // Add a Promotion
  addPromotion: (promotion, cb) => {
    knex("promotion")
      .insert({
        business_id: promotion.business_id,
        promotion_name: promotion.promotion_name,
        qtypeople: promotion.qtypeople,
        description: promotion.description
      })
      .then(response => {
        cb.json(response);
      })
      .catch(err => console.log(err));
  },
  //Delete Promotion
  deletePromotion: (id, cb) => {
    knex("promotion")
      .where("id", id)
      .del()
      .then(res => {
        cb.json(res);
      })
      .catch(err => console.log(err));
  },
  editPromotion: (promotion, cb) => {
    knex("promotion")
      .where("id", promotion.promotion_id)
      .update({
        description: promotion.description,
        qtypeople: promotion.quantity,
        promotion_name: promotion.name
      })
      .then(response => {
        cb.json(response);
      })
      .catch(err => console.log(err));
  },
  getPromotionsByBusiness: (id, cb) => {
    //knex select on promotion where id = the id
    knex("promotion")
      .select("*")
      .where("business_id", id)
      .then(result => {
        // map through result to make array of objects for markers
        let promotions = result.map(item => {
          return {
            name: item.promotion_name,
            quantity: item.qtypeople,
            description: item.description,
            promotion_id: item.id
          };
        });
        cb.json(promotions);
      })
      .catch(err => console.log(err));
  },
  getPromotionAndInfo: (id, cb) => {
    knex('promotion')
      .leftJoin('businessinfo', 'promotion.business_id', 'businessinfo.business_id')
      .where('businessinfo.business_id', id)
      .select('*')
      .then(response => {
        cb.json(response)
      })
      .catch(err => console.log(err));
  }
};

module.exports = Promotions;