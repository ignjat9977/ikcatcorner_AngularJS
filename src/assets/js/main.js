window.onload = function(){
    ajaxCallBack("menu.json", function(data){
        dynamicNav(data, "nav");
        dynamicNav(data, ".quick-links");
    })
    
    
    addClassToAll(document.querySelectorAll("h4"), "ik-margin-bottom");

    var url = window.location.pathname;
    $("#ik-ham-btn").click(function(e){
        e.preventDefault();
        $(".ik-nav-div").slideToggle();
    })
    if(url=="/" || url =="/index.html"){       
        indexPage();
    }
    if(url=="/shop.html"){
        shopPage();
    }
    if(url=="/about.html"){
        aboutPage();
    }
    if(url=="/cart.html"){
        let productsFromCart = getLocalStorage("cart");

        if(productsFromCart == null){
            showEmptyCart();
        }
        else{
            showCart();
        }
    }
    if(url == "/contact.html"){
        contactPage()
    }
}
function indexPage(){
    slideShow();
    slider();

    ajaxCallBack("service.json",function(data){
        makeService(data, "#service");
    })
    
    addClassToAll(document.querySelectorAll("h5"), "ik-color-dark-blue");
    addClassToAll(document.querySelectorAll("p"),"ik-color-light-blue")
    
    ajaxCallBack("brandsSection.json", function(data){
        makeRowInOrder(data, "#brands");
    })
    
    $("#brands .container h3").addClass("ik-color-dark-blue");
    $("#brands .container:odd p").addClass("ik-color-light-blue");
    $("#brands .container:even p").addClass("ik-color-white");
}
function shopPage(){
    
    ajaxCallBack("brands.json", function(data){
        makeDropDownMenu(data, "#ik-brands-list","ik-brands-ddl", "Brand");
        $("#ik-brands-ddl").change(filterChange);
    })
    ajaxCallBack("categories.json", function(data){   
        makecheckBoxList(data,1,"#ik-food-list");
        makecheckBoxList(data,2,"#ik-equ-list");
        makecheckBoxList(data,3,"#ik-toy-list");
        $(".ik-check-name-prod").change(filterChange);
    }) 
    ajaxCallBack("sort.json", function(data){
        makeDropDownMenu(data, "#ik-sort-list", "ik-sort-ddl", "Sort Type");
        $("#ik-sort-ddl").change(filterChange);
    })
    $("#ik-search-prod").keyup(filterChange);
    $("#ik-filter-price").change(filterChange);
}
function aboutPage(){
    ajaxCallBack("aboutSection.json", function(data){
        makeRowInOrder(data, "#ik-about");
    })
}
function contactPage(){
    var city = ["London","New York", "Barcelona", "Belgrade", "Paris"]
    var str = `<select class="form-control" id="ddlCity"><option value="0">Choose City</option>`
    for(var i = 0; i<city.length; i++ ){
        str+=`<option value="${i + 1}">${city[i]}</option>`
    }
    str+="</select>"
    $("#ddlCityDiv").html(str);

    $("#tbName").blur(function(){
        var field = $(this)
        var val = $(this).val()
        var reg = /^[A-ZČĆŠĐŽ][a-zčćšđž]{2,15}(\s[A-ZČĆŠĐŽ][a-zčćšđž]{2,15})?$/

        checkReg(field, val, reg, "John")
    })
    $("#tbLast").blur(function(){
        var field = $(this)
        var val = $(this).val()
        var reg = /^[A-ZČĆŠĐŽ][a-zčćšđž]{2,15}(\s[A-ZČĆŠĐŽ][a-zčćšđž]{2,15})?$/

        checkReg(field, val, reg, "James")
    })
    $("#tbEmail").blur(function(){
        var field = $(this)
        var val = $(this).val()
        var reg =/^[a-z][\w\.\-]+\@[a-z0-9]{2,15}(\.[a-z]{2,4}){1,2}$/

        checkReg(field, val, reg, "example@gmail.com")
    })
    $("#tbMessage").blur(function(){
        var field = $(this)
        checkEmptyFieldM(field)
    })
    $("#sendM").click(function(){
        var error = 0
        var reg = /^[A-ZČĆŠĐŽ][a-zčćšđž]{2,15}(\s[A-ZČĆŠĐŽ][a-zčćšđž]{2,15})?$/
        var regE =/^[a-z][\w\.\-]+\@[a-z0-9]{2,15}(\.[a-z]{2,4}){1,2}$/
        checkRegTwo($("#tbName"), $("#tbName").val(), reg, "John")
        checkRegTwo($("#tbLast"), $("#tbLast").val(), reg, "James")
        checkRegTwo($("#tbEmail"),$("#tbEmail").val(), regE, "example@gmail.com")
        checkEmptyFieldM1($("#tbMessage"));
        if($("#ddlCity").val()=="0"){
            $("#ddlCity").parent().next().html("You must choose city!");
            $("#ddlCity").parent().next().addClass("alert")
            $("#ddlCity").parent().next().addClass("alert-danger")
            error++
        }else{
            $("#ddlCity").parent().next().html("");
            $("#ddlCity").parent().next().removeClass("alert")
            $("#ddlCity").parent().next().removeClass("alert-danger")
        }
        let rbGender = $("input[name='rbGen']");
        var rbValue = "";
        for(let i = 0; i < rbGender.length; i++){
            if(rbGender[i].checked){
                rbValue = rbGender[i].value;
                break;
            }
        }
        if(rbValue == ""){
            $("#rbW").html("You must choose gender")
            $("#rbW").addClass("alert")
            $("#rbW").addClass("alert-danger")
            error++
        }
        else{
            $("#rbW").html("")
            $("#rbW").removeClass("alert")
            $("#rbW").removeClass("alert-danger");
        }
        if(error == 0){
            $("#messageModal").show()
            $(".ik-m-close").click(function(e){
                e.preventDefault()
                $("#messageModal").hide()
            })
        }
        
        function checkRegTwo(f,v,r,str){
            if(r.test(v)){
                f.next().html("")
                f.next().removeClass("alert")
                f.next().removeClass("alert-danger")
            }else{
                error++
                f.next().html("Correct form is: (" + str + ")")
                f.next().addClass("alert")
                f.next().addClass("alert-danger")
            }
        }
        function checkEmptyFieldM1(x){
            if(x.val().length<=10){
                x.next().html("You must send at least 10 letters");
                x.next().addClass("alert")
                x.next().addClass("alert-danger")
                error++
            }else{
                x.next().html("");
                x.next().removeClass("alert")
                x.next().removeClass("alert-danger")
            }
        }
    })
    function checkReg(f,v,r,str){
        if(r.test(v)){
            f.next().html("")
            f.next().removeClass("alert")
            f.next().removeClass("alert-danger")
        }else{
            f.next().html("Correct form is: (" + str + ")")
            f.next().addClass("alert")
            f.next().addClass("alert-danger")
        }
    }
    function checkEmptyFieldM(x){
        if(x.val().length<=10){
            x.next().html("You must send at least 10 letters");
            x.next().addClass("alert")
            x.next().addClass("alert-danger")
        }else{
            x.next().html("");
            x.next().removeClass("alert")
            x.next().removeClass("alert-danger")
        }
    }

}
function dynamicNav(arr, div){
    var str = "<ul>";
    for(let item of arr){
        str+=`<li><a href="${item.link}">${item.name}</a></li>`;
    }
    str+="</ul>";
    document.querySelector(div).innerHTML = str;
}
function addClassToAll(elements, classL){
    for(let i=0; i<elements.length; i++){
        elements[i].classList.add(classL);
    }
}
function removeClassToAll(elements, classL){
    for(let i=0; i<elements.length; i++){
        elements[i].classList.remove(classL);
    }
}
function slideShow(){
    var element = $("#slider .ik-slider-active");
    var nextElement = element.next().length ? element.next() : element.parent().children(':first');
    nextElement.fadeIn().addClass("ik-slider-active");
    element.hide().removeClass("ik-slider-active");
    setTimeout(slideShow, 4500); 
} 
function slider(){
    $(".ik-right-arrow a").click(function(e){
        e.preventDefault();
        var element = $("#slider .ik-slider-active");
        var nextElement = element.next().length ? element.next() : element.parent().children(':first');
        nextElement.fadeIn().addClass("ik-slider-active");
        element.hide().removeClass("ik-slider-active");   
    })
    $(".ik-left-arrow a").click(function(e){
        e.preventDefault();
        var element = $("#slider .ik-slider-active");
        var prevElement = element.prev().length ? element.prev() : element.parent().children(':last');
        prevElement.fadeIn().addClass("ik-slider-active");
        element.hide().removeClass("ik-slider-active");
    })
} 

function makeService(arr, div){
    str = "";
    for(let item of arr){
        str+=`<div class="col-12 col-md-4 m">
              <div class="card ik-card mb-3 rounded-0 shadow">
                <img src="${item.imgSrc}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                  <h5 class="card-title">${item.name}</h5>
                  <p class="card-text">${item.description}</p>
                  <a href="shop.html" class="btn btn-primary">Go to Shop</a>
                </div>
              </div>
            </div>`;        
    }
    document.querySelector(div).innerHTML = str;
}
function makeRowInOrder(arr, div){
    var str="";
    for(let section in arr){
        str+=`<div class="${arr[section].backgroundColor} py-5">
            <div class="container">
                <div class="row align-items-center align-content-center">
                    <div class="col-12 col-md-6 ${arr[section].order.order1} d-flex">
                        <img src="${arr[section].src}" alt="${arr[section].name}" class="img-fluid d-block">
                    </div>
                    <div class="col-12 col-md-6 ${arr[section].order.order2}">
                        <h3>${arr[section].name}</h3>
                        <p>${arr[section].description}</p>
                    </div>
                </div>
            </div>
            </div>`;
    }
    document.querySelector(div).innerHTML = str;
}
function showProducts(data){
    var str="";
    data = filterByBrand(data);
    data = filterByCategory(data);
    data = sortItems(data);
    data = filterSearch(data);
    data = filterPrice(data);
    if(data.length == 0){
        str=`<div class="col-12">
                <h2 class="text-center text-capitalize ik-color-light-blue">Sorry, we dont have such product</h2>
                <img alt="No products" src="assets/img/no-products.png" class="img-fluid ik-no-prod"/>
            </div`;
    }else{
        for(product of data){
            str+=`<div class="col-md-4 col-sm-6 col-12 ik-item-div mb-3">
                        <div class="ik-item shadow">
                            <img src="assets/img/${product.img.src}" alt=${product.img.alt} class="img-fluid ik-img"/>
                            <div class="ik-item-body px-4">
                                <p>${product.name}</p>
                                <p class="mb-2">${printCategories(product.categories, product.subCategories)}</p>
                            </div>
                            ${printPrice(product.price)}
                            <div class="ik-item-footer px-2 py-2">
                                <a href="#" class="btn btn-primary ik-buy-button mb-1" data-id="${product.id}">Add to cart</a>
                                <a href="#" class="btn btn-primary ik-see-more-btn mb-1" onclick="seeMore(this)" data-product-id="${product.id}">See More</a>
                            </div>
                        </div>
                    </div>`
            
        }
    }
    
    document.querySelector(".ik-products-div").innerHTML = str;
     var items = document.querySelectorAll(".ik-item-div");
    document.querySelector(".ik-2-col").addEventListener("click",function(e){
        e.preventDefault();
        removeClassToAll(items, "col-md-4");
        addClassToAll(items,"col-md-6");
    })
    document.querySelector(".ik-3-col").addEventListener("click",function(e){
        e.preventDefault();
        removeClassToAll(items, "col-md-6");
        addClassToAll(items,"col-md-4");
    })
    $('.ik-buy-button').click(addToCart);
}
function makeDropDownMenu(brands, div, ddlName, NameSelect){
    var str=`<select class="form-control rounded-0" id='${ddlName}'>
    <option value='0'>Choose ${NameSelect}</option>`;
    for(var brand of brands){
        str+=`<option value="${brand.value}">${brand.name}</option>`;
    }
    str+="<select>";
    document.querySelector(div).innerHTML = str; 
    ajaxCallBack("products.json", function(data){  
        setLocalStorage("allProducts", data);    
        showProducts(data);
    })  
}
function calculatePrice(prices){
    var price = prices.noDis * (100 - prices.discount) / 100;
    price = Math.round(price * 100) / 100;
    return price;
}
function filterByBrand(data){
    var ddlValue = $("#ik-brands-ddl").val();
    if(ddlValue == "0"){
        return data;
    }
    return data.filter(el=>el.brand == ddlValue);
}
function seeMore(e){
    var id = e.getAttribute("data-product-id");
    let str="";
    ajaxCallBack("products.json", function(data){
        setLocalStorage("prod", data);
    })
    var products = getLocalStorage("prod");
    var filteredItem = products.filter(el=>el.id==id);
        for(index of filteredItem){
            str+=`<div class="d-flex flex-wrap">
                    <div class="col-12 col-md-6">
                        <img src="assets/img/${index.img.src}" alt="${index.img.alt}" class="img-fluid ik-img-see-more">
                    </div>
                    <div class="col-12 col-md-6 d-flex flex-column justify-content-center">
                        <h2>${index.name}</h2>
                        $${printPrice(index.price)}
                        <p class="mb-2">
                        ${index.description}
                        </p>
                        <a href="#" class="btn btn-danger align-self-end mr-4" id="ik-close-btn">Close</a>
                    </div>
                </div>`
        }
    $("#ik-modal").html(str);
    $("#ik-modal").fadeIn();
    $("#ik-close-btn").click(function(){
        $("#ik-modal").fadeOut();
    })
    
    
}
function makecheckBoxList(arr,id,div,namee){
    let str = "";
    for(index of arr){
        if(index.id==id){
            str+=`<li class="list-group-item list-group-item-primary">${index.name}</li>`
            for(cat in index.categories){
                str+=`<li class="list-group-item"><input type="checkbox" name="ik-check-name-prod" value="${index.categories[cat].catId}" class="ik-check-name-prod" />${index.categories[cat].categoryName}</li>`
            }
        }
    }
    $(div).html(str);
}
function printCategories(categorisesId, subCategoriesIds){
    str="";
    ajaxCallBack("categories.json", function(data){
        setLocalStorage("cate", data);
    })
    var cat = getLocalStorage("cate");
    for(index of cat){
        if(categorisesId==index.id){
            str+=`${index.name}, `;
            printSubCategories(subCategoriesIds);
        }
    }
    return str;
}
function printSubCategories(subCategoriesIds){
    for(cat in subCategoriesIds){
        for(subCat of index.categories){
            if(subCategoriesIds[cat] == subCat.catId){
                str+=subCat.categoryName;
                if(subCategoriesIds.length>cat+1){
                    str+=", ";
                }
            }
        }
    }
    return str;
}
function printPrice(price){
    let html="";
    
    if(price.discount != null){
        html =`<div class="ik-discount pt-2 px-2">
                    <h4>${price.discount}%</h4>
                </div>
                <div class="px-4">
                  <p><span class="ik-color-red">$${calculatePrice(price)}</span> 
                  <del class="ml-2">$${price.noDis}</del></p>
               </div>
            `
    }
    else{
        html= `<div class="px-4">
                    <p><span class="ik-color-red">${price.noDis}&euro;</span>
               </div>`
    }
    return html;
}
function filterByCategory(data){
    var categoriesIds = [];
    $.each($(`input[name='ik-check-name-prod']:checked`), function(){
        categoriesIds.push($(this).val());
	});
    let filteredProducts = data.filter(function(e){
        for(cat of e.subCategories){
            for(id of categoriesIds){
                if(cat==id){
                    return true;
                }
            }
        }
    })
    if(filteredProducts.length){
        return filteredProducts;
    }else{
        return data;
    }
}
function setLocalStorage(itemName, fun){
    return localStorage.setItem(itemName, JSON.stringify(fun));
}
function getLocalStorage(itemName){
    return JSON.parse(localStorage.getItem(itemName));
}
function filterChange(){
    ajaxCallBack("products.json", showProducts);
}
function sortItems(data){
    var sortType = $("#ik-sort-ddl").val();
    if(sortType == "ascPrice"){
        return data.sort((a,b)=> a.price.noDis > b.price.noDis ? 1 : -1);
    }
    if(sortType == "descPrice"){
        return data.sort((a,b)=> a.price.noDis < b.price.noDis ? 1 : -1);
    }
    if(sortType == "0"){
        return data;
    }
    if(sortType == "ascLetter"){
        return data.sort((a,b)=> a.name > b.name ? 1 : -1);
    }
    if(sortType == "descLetter"){
        return data.sort((a,b)=> a.name < b.name ? 1 : -1);
    }
    
}
function filterSearch(data){
    let searchValue = $("#ik-search-prod").val().toLowerCase();
    if(searchValue){
        return data.filter(function(el){
            return el.name.toLowerCase().indexOf(searchValue) !== -1;
        })
    }
    return data;
}
function filterPrice(data){
    var v = $("#ik-filter-price").val();
    $("#ik-fp-op").html(v);
    return data.filter(function(el){
        if(el.price.noDis<v){
            return el;
        }
    })
}
function addToCart(e){
    let idProduct = $(this).data("id");
    e.preventDefault()

    let productsFromCart = getLocalStorage("cart");

    if(productsFromCart){
        if(productIsAlreadyInCart()){
            updateQty();
        }
        else{
            addNewProductToCart();
            printCartLength()
        }

    }
    else{
        addFirstProductToCart();
        printCartLength()
    }

    function addFirstProductToCart(){
        let products = [];
        products[0] = {
            id: idProduct,
            qty: 1
        }

        setLocalStorage("cart", products);
    }

    function productIsAlreadyInCart(){
        return productsFromCart.filter(p => p.id == idProduct).length;
    }

    function updateQty(){
        let productsFromLS = getLocalStorage("cart");

        for(let product of productsFromLS){
            if(product.id == idProduct){
                product.qty++;
                break;
            }
        }

        setLocalStorage("cart", productsFromLS);
    }
    function addNewProductToCart(){
        let productsFromLS = getLocalStorage("cart");

        productsFromLS.push({
            id: idProduct,
            qty: 1
        });

        setLocalStorage("cart", productsFromLS);
    }
}
function printCartLength(){
    let productsFromCart = getLocalStorage("cart");
    let productNumberSpan = $(".ik-num-prod");
    let productNumberText = "";

    if(productsFromCart){
        let productNumber = productsFromCart.length;

        if(productNumber == 1){
            productNumberText = `${productNumber}`
        }
        else{
            productNumberText = `${productNumber}`
        }
    }
    else{
        productNumberText = `0`
    }

    $(productNumberSpan).html(productNumberText);

}
var b;
function showEmptyCart(){
    let html = `<div class="row">
                    <div class="col-12">
                        <img src="assets/img/empty-cart.png" class="d-block mx-auto img-fluid" alt="Empty Cart"/>
                    </div>
                </div>`
    $("#content").html(html);
}
function showCart(){
    let allProducts = getLocalStorage("allProducts");
    let productsFromCart = getLocalStorage("cart");

    let productsForDisplay = allProducts.filter(product =>{
        
        for(let productLS of productsFromCart){
            if(product.id == productLS.id){
                product.qty = productLS.qty
                return true;
            }
        }
        return false;
    })
    printDataFromCart(productsForDisplay);
}
function printDataFromCart(products){
    let html = `
    <table class="table table-active">
        <thead>
            <tr>
                <th>SL No.</th>
                <th>Product</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Sum</th>
                <th>Remove</th>
            </tr>
        </thead>
        <tbody>`;
        var sum
        
        sum = printSumPrices(products)
        for(let p of products) {
            html += generateTr(p);;
        }

        html +=`    </tbody>
            </table>
            <p class="float-right"> Total: $${sum}</p>`;

        $("#content").html(html);

        if(products.length == 0){
            showEmptyCart()
            b=true;
        }

        function generateTr(p) {
            return  `<tr class="table-primary">
            <td class="invert">${p.id}</td>
            <td class="invert-image">
                <a href="shop.html">
                    <img src="assets/img/${p.img.src}" style='height:100px' alt="${p.img.alt}" class="img-fluid" />
                </a>
            </td>
            <td class="invert">${p.name}</td>
            <td class="invert">$${p.price.noDis}</td>
            <td class="invert">${p.qty}</td>
            <td class="invert">$${p.price.noDis * p.qty}</td>
            <td class="invert">
                <div class="rem">
                    <div class=""><button class="btn btn-danger" onclick='removeFromCart(${p.id})'>Remove</button> </div>
                </div>
            </td>
        </tr>`
        }
        $("#remAll").click(removeFromCartAll)
        $("#buy").click(message);
}
function removeFromCart(id) {
    let products = getLocalStorage("cart");
    let filtered = products.filter(p => p.id != id);

    setLocalStorage("cart", filtered);

    showCart();
}
function message(){
    var html=""
    if(!b){
        html = `<p class="alert text-center alert-success">You have successfully completed your purchase</p>`     
        $("#content").html(html);   
    }else{
        showEmptyCart()
    }
}
function printSumPrices(p){
    var sum = 0
    p.forEach(x=>{
        sum += x.price.noDis * x.qty
    })
    sum = Math.round(sum * 100) / 100;
    return sum

}
function removeFromCartAll(e){
    e.preventDefault()
    localStorage.removeItem("cart") 
    showEmptyCart()
}
function ajaxCallBack(file,callback){
    $.ajax({
        url:"assets/data/" + file,
        method: "get",
        dataType: "json",
        success: function(result){
            callback(result);
        },
        error: function(xhr){
            $("#err-modal").fadeIn();
            $(".ik-err-close").click(function(){
                $("#err-modal").fadeOut();
            })
        }
    })
}