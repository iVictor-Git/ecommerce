const donationData = {
  name: "Donate!",
  description:
    "Help support your local developer by investing in his journey to change the world of technology.",
  contact: "Victor.N.Tran.Developer@outlook.com"
};

const cardData = [
  {
    type: "text",
    name: "name",
    field: "Name on Card",
    id: "name",
    maxLength: 20
  },
  {
    type: "text",
    name: "number",
    field: "Card Number",
    id: "number",
    maxLength: 20
  },
  {
    type: "text",
    name: "expiration",
    field: "Expiration",
    id: "expiration",
    maxLength: 7
  },
  {
    type: "password",
    name: "cvv",
    field: "CVV",
    id: "cvv",
    maxLength: 3
  },
  {
    type: "text",
    name: "amount",
    field: "Amount",
    id: "amount",
    maxLength: 20
  }
];

export { donationData, cardData };
