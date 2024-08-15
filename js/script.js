//POST
function addproduct(){
    var product = new Object();
    product.name = document.getElementById('name').value;
    product.description = document.getElementById('description').value;
    product.price = document.getElementById('price').value;
    product.category = document.getElementById('category').value;
    product.imagepath = document.getElementById('imagepath').value;

    var request = new XMLHttpRequest();
    request.open('POST',"/product",true);
    request.setRequestHeader("Content-type","application/json")

    request.onload = function(){
        alert(request.responseText)
        window.location.href = "/loadproduct.html";
    }
    request.send(JSON.stringify(product));
}

//GET 
function loadproducts(){
    var request = new XMLHttpRequest();

    var productarray = [];

    request.open("GET","/product",true)

    request.onload = function(){
        productarray = JSON.parse(request.responseText)
        insertproduct(productarray)
    }

    request.send()
}


function insertproduct(productarray){
    var productlist = document.getElementById('productdata');
    let newContent = '<table><tr>';
    for (let i=0; i< productarray.length; i++){
        console.log(productarray[i]);
        newContent +=
            "<td><h4>"+ productarray[i].name + "</h4>" +
            "<img src='" +productarray[i].picture + " ' width='150'><br>"+"description: " +productarray[i].description + "<br>"+ "Category: "+productarray[i].category_name+"<br>"+"Price: "+productarray[i].price+"<br>"+
            "<input type='button' onclick='editproduct(this)' restid='"+productarray[i].id +"' value='Edit'>" +
            "<input type='button' onclick='deleteproduct(this)' restid='"+productarray[i].id+"' value='Delete' ></td>"

         
          if ((i + 1) % 4 === 0 ) {
              newContent += '</tr><tr>';
          }
      }

      newContent += '<td colspan="1"><button onclick="redirectToPostProduct()"class="add-productbutton">&#43 <br>Add Product</button></td>';
      newContent += "</tr></table>";
      productlist.innerHTML = newContent;
};

function redirectToPostProduct(){
    window.location.href = "post_product.html"
}

function cancel(){
    window.location.href = "loadproduct.html"
}

//UPDATE
function loadproductdata(){
    var request = new XMLHttpRequest();

    var params = new URLSearchParams(location.search);
    var id = params.get("id");

    console.log("id" + id)
    var product;
    var urlLink = "/product/"+ id
    request.open("GET", urlLink, true)
    //console.log(request.open("GET", urlLink, true))

    request.onload = function(){
        //console.log(request.responseText)
        product = JSON.parse(request.responseText);
        console.log(product)
        setproduct(product[0]);
    }
    request.send();
}

function setproduct(product){
    document.getElementById('name').value = product.name;
    document.getElementById('image_path').value = product.picture;
    document.getElementById('description').value = product.description;
    document.getElementById('category').value = product.category_id;
    document.getElementById('price').value = product.price;
    document.getElementById('id').value = product.id;
    document.getElementById('deletebutton').setAttribute("restid",product.id)
}

function updateproduct(){
    var product = new Object();
    product.name = document.getElementById('name').value;
    product.image_path = document.getElementById('image_path').value;
    product.description = document.getElementById('description').value;
    product.category = document.getElementById('category').value;
    product.price = document.getElementById('price').value;

    var id = document.getElementById('id').value;
    console.log(id)
    var request = new XMLHttpRequest();
    var urlLink = "/product/" +id;
    request.open("PUT", urlLink, true)
    request.setRequestHeader("Content-Type", "application/json")

    request.onload = function(){
        alert(request.responseText)
        window.location.href = "/loadproduct.html";
    };
    request.send(JSON.stringify(product))
}


function editproduct(item){
    var id = item.getAttribute("restid");
    console.log(id)

    location.href = "/update_product.html?id="+id;
}

function deleteproduct(item){
    var id = item.getAttribute("restid")
    console.log("delete id "+id)
    
    var request = new XMLHttpRequest();

    request.open("delete", "/product/"+id, true)

    request.onload = function(){
        window.location.href = "/loadproduct.html";
    }
    request.send();
}