
var ul=document.getElementById('list');
var li;


for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if(localStorage.getItem(key)!='user_defined')
    {        
        var info=localStorage.getItem(key)    
        var info_ind=info.indexOf(" ")
        var href_info=info.substring(0,info_ind)    
        var date_info=info.substring(info_ind+1,info.length)         
        ul=document.getElementById('list')
        var textnode=document.createTextNode(key)   
        li=document.createElement('li')        
        
        var checkbox=document.createElement('input')
        checkbox.type='checkbox';
        checkbox.setAttribute('id','check')                
        var a_href=document.createElement('a')

        // console.log(info_arr[0]+" && "+info_arr[1])
        var d=new Date(date_info)
        var date=d.toLocaleDateString()+" "+d.toLocaleTimeString()    
        var fdate="  Start Time: "+date
        var label=document.createElement('label')   
        var text_date=document.createTextNode(fdate)     
         label.appendChild(text_date)
        li.appendChild(checkbox)
        a_href.appendChild(textnode)
        a_href.href=href_info
        console.log(a_href.href)
        a_href.target="_blank"
        li.appendChild(a_href);
        li.appendChild(label)
        if(ul.hasChildNodes)
        ul.insertBefore(li,ul.childNodes[0])
        else
        ul.appendChild(li)
        li.className='visual'

        input.value=''    
    }
    else{
        ul=document.getElementById('list')
        var textnode=document.createTextNode(key)   
        li=document.createElement('li')        
        
        var checkbox=document.createElement('input')
        checkbox.type='checkbox';
        checkbox.setAttribute('id','check')  
        var label=document.createElement('label')
        
        
        li.appendChild(checkbox)
        label.appendChild(textnode)
        li.appendChild(label);
        
        if(ul.hasChildNodes)
        ul.insertBefore(li,ul.childNodes[0])
        else
        ul.appendChild(li)
        li.className='visual'

        input.value=''        
    }  
    }


var addButton=document.getElementById('add');
addButton.addEventListener('click',addItem);



var refresheverythingButton=document.getElementById('remove_everything');
refresheverythingButton.addEventListener('click',refreshwholeItem);

var timer=setInterval(removeItem,1000);
var timer2=setInterval(removeverything,86400000);
function addItem(){
    var input=document.getElementById('input')
    var item=input.value;
    ul=document.getElementById('list')
    var textnode=document.createTextNode(item)      
    if(item===''||localStorage.getItem(item)!=null)
    {        
        return false;
    }
    else{
                
        localStorage.setItem(item,"user_defined")
        // console.log(localStorage)
        li=document.createElement('li')        
        
        var checkbox=document.createElement('input')
        checkbox.type='checkbox';
        checkbox.setAttribute('id','check')        

        var label=document.createElement('label')
        
        
        li.appendChild(checkbox)
        label.appendChild(textnode)
        li.appendChild(label);
        
        if(ul.hasChildNodes)
        ul.insertBefore(li,ul.childNodes[0])
        else
        ul.appendChild(li)
        li.className='visual'

        input.value=''        
    }
}
function removeItem(){
    if(localStorage.length>0)
    {
    li=ul.children    
    for (let index = 0; index < li.length; index++) {
        
       if(li[index]&&li[index].children[0].checked){
        // console.log(li[index])
          var remove_text=li[index].children[1].textContent;                                    
            ul.removeChild(li[index])
            localStorage.removeItem(remove_text)
            
            index--;         
        }
    }
}
}
function removeverything(){
    if(localStorage.length>0)
    {
    li=ul.children    
    for (let index = 0; index < li.length; index++) {
        
       if(li[index]&&li[index].children[0]){
        // console.log(li[index])
          var remove_text=li[index].children[1].textContent;                                    
            ul.removeChild(li[index])
            localStorage.removeItem(remove_text)
            
            index--;         
        }
    }
}
}
function refreshwholeItem(){
    fetch('https://kontests.net/api/v1/all')
    .then(data=>data.json())
    .then(needdata=> {
        var stop=0;
        var flag=false;       
        var add_new_item=[] 
        var add_new_href=[]
        var add_new_time=[]
        while(stop<needdata.length)
        {
            if (needdata[stop].in_24_hours=='Yes')
            {
                add_new_item.push(needdata[stop].name)  
                add_new_href.push(needdata[stop].url)
                add_new_time.push(needdata[stop].start_time)
                flag=true
            }
            stop++;            
        }                
        for (var j=0;j<add_new_item.length;j++)
        {
            var i=add_new_item[j]
            var h=add_new_href[j]
            var t=add_new_time[j]
            // console.log(i)
            // console.log(add_item.has(i))
            if (localStorage.getItem(i)==null)
        {
            localStorage.setItem(i,h+" "+t)            
            var contest_name=i+"\n";                
        ul=document.getElementById('list')
        var textnode=document.createTextNode(contest_name)        
         
            li=document.createElement('li')        
        
            var checkbox=document.createElement('input')
            checkbox.type='checkbox';
            checkbox.setAttribute('id','check')

           var a_href=document.createElement('a')
        //    console.log(t)
           var d=new Date(t)
           var date=d.toLocaleDateString()+" "+d.toLocaleTimeString()
        //    console.log(date)
           var label=document.createElement('label')
           var fdate="  Start Time: "+date
           
           var text_date=document.createTextNode(fdate)     
            label.appendChild(text_date)
             li.appendChild(checkbox)
            a_href.appendChild(textnode)
            a_href.setAttribute("href",h)
            a_href.target="_blank"
              li.appendChild(a_href);                            
              li.appendChild(label)
      if(ul.hasChildNodes)
        ul.insertBefore(li,ul.childNodes[0])
        else
        ul.appendChild(li)
        li.className='visual'

        input.value=''
        }
        }
         }
    )
    }