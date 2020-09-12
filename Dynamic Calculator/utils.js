const add = document.getElementById('add');
const name = document.getElementById('name');
const price = document.getElementById('price');
const list = document.getElementById('list');
const total = document.getElementById('total');

function createItem(name, price){
  let listItemNode = document.createElement('li');
  let nameNode = document.createElement('span');
  let priceNode = document.createElement('span');
  let removeButton = document.createElement('button');
  let itemInfo = document.createElement('span');
  let completeItem = document.createElement('div');

  nameNode.innerText = `${name}:`;
  priceNode.innerText = Number(price);
  priceNode.className = 'item-price';
  removeButton.innerText = 'Remove';
  removeButton.addEventListener('click', deleteItem);

  itemInfo.appendChild(nameNode);
  itemInfo.appendChild(document.createTextNode(' '));
  itemInfo.appendChild(priceNode);

  completeItem.appendChild(itemInfo);
  completeItem.appendChild(removeButton);
  completeItem.className = 'list-item';

  listItemNode.appendChild(completeItem);

  return listItemNode;
}

function calculateTotal() {
  let prices = Array.from(document.querySelectorAll('.item-price'));
  prices = prices.map(el => el.innerText);

  let totalPrice = 0;
  if (prices.length > 0) totalPrice = prices.reduce((t, v) => Number(t) + Number(v));
  return totalPrice;
}

add.addEventListener('click', _ => {

  if (!name.value || !price.value) {
    name.style.borderColor = "red";
    price.style.borderColor = "red";

    return;
  }else{
    name.style.borderColor = null;
    price.style.borderColor = null;
  }

  list.appendChild(createItem(name.value, price.value));

  total.innerText = calculateTotal();
  resetFields();
})

function deleteItem(e) {
  e.target.closest('li').remove();
  total.innerText = calculateTotal();
}

function resetFields() {
  name.value = '';
  price.value = '';
}