const products=[
    { name:"wireless Headphones",price:"7,999",desc: "Noise-cancelling over-ear headphones",img: "manus_style.jpg"},
    { name: "Smartwatch", price: "12,999", desc: "Fitness tracking smartwatch", img: "manus_style.jpg" },
    { name: "Gaming Mouse", price: "2,499", desc: "Ergonomic gaming mouse", img: "manus_style.jpg" },
    { name: "Laptop Stand", price: "1,999", desc: "Adjustable aluminium stand", img: "manus_style.jpg" },
    { name: "Keyboard", price: "1,299", desc: "Mechanical keyboard", img: "manus_style.jpg" },
    { name: "Monitor", price: "15,000", desc: "Full HD Monitor", img: "https://via.placeholder.com/80" },
    { name: "Speaker", price: "3,000", desc: "Bluetooth speaker", img: "https://via.placeholder.com/80" },
    { name: "Monitor", price: "15,000", desc: "Full HD Monitor", img: "https://via.placeholder.com/80" },
    { name: "Speaker", price: "3,000", desc: "Bluetooth speaker", img: "https://via.placeholder.com/80" }
];

let current_page=1;
const rowsperpage=5;



function display(){
    const tablebody=document.getElementById("tablebody");
    tablebody.innerHTML="";

    let start=(current_page-1)*rowsperpage;
    let end=start+rowsperpage;
    let paginationItems=products.slice(start,end);

    paginationItems.forEach(product=>{
        let row="<tr>"+
                "<td><img src='"+product.img+"'></td>"+
                "<td>"+product.name+"</td>"+
                "<td>"+product.price+"</td>"+
                "<td>"+product.desc+"</td>"+
                "</tr>";
        tablebody.innerHTML+=row;        
    });

    document.getElementById("pageinfo").innerText="Page " + current_page + " of " + Math.ceil(products.length / rowsperpage); //see here neat innertext ahe.
}




function nextpage(){
    if(current_page<Math.ceil(products.length/rowsperpage)){
        current_page++;
        display();
    }
}


function prevpage(){
    if(current_page>1){
        current_page--;
        display();
    }
}



display();