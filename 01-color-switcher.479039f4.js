const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),d=document.body;t.addEventListener("click",function(){r=setInterval(()=>{d.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`},1e3),e.removeAttribute("disabled"),t.setAttribute("disabled",!0)}),e.addEventListener("click",function(){clearInterval(r),e.setAttribute("disabled",!0),t.removeAttribute("disabled")}),e.setAttribute("disabled",!0);let r=null;
//# sourceMappingURL=01-color-switcher.479039f4.js.map
