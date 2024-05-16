'use strict';

let Count=3;




function getDimensions() {
    const container = document.getElementById('container');
    const blocks = container.querySelectorAll('.block');
    const containerCoords = container.getBoundingClientRect();
    const blockInfoDiv = document.getElementById('blockInfo');
    blockInfoDiv.innerHTML = "";

    blocks.forEach(block => {
      const blockCoords = block.getBoundingClientRect();
      const blockInfo = document.createElement('div');
      blockInfo.textContent = `${block.textContent}:, Width: ${block.offsetWidth}, Height: ${block.offsetHeight}, Window Coordinates: Left: ${Math.floor(blockCoords.left)}, Top: ${Math.floor(blockCoords.top + window.scrollY)}, Container Coordinates: Left: ${Math.floor(blockCoords.left - containerCoords.left)}, Top: ${Math.floor(blockCoords.top - containerCoords.top + container.scrollTop)}\n\n`;
      blockInfoDiv.appendChild(blockInfo);
    });
  }

  function changeSize(id) {
    const newSize = prompt("Enter new size (in pixels):");
    const sizes = newSize.split(' '); 
    let newWidth, newHeight;
    newWidth = sizes[0];
    if (sizes.length === 1) newHeight = sizes[0]; 
   else if (sizes.length === 2) newHeight = sizes[1];
    else return; 
    
    const block = document.getElementById(id);
    block.style.width = newWidth + "px";
    block.style.height = newHeight + "px";
  }
  
  
  function addElement() {
    console.log("entered");
    const newBlock = document.createElement('div');
    console.log("created div");
    newBlock.classList.add('block');
    const newId = `block${++Count}`;
    newBlock.setAttribute('id', newId);
    newBlock.textContent = `Block ${Count}`;
    const randomColor = getRandomColor();
    newBlock.style.backgroundColor = randomColor;
    const darkerColor = darkenColor(randomColor);
    newBlock.style.border = `1px solid ${darkerColor}`;

    const cont = document.getElementById('container');
    cont.appendChild(newBlock);
    newBlock.addEventListener("click", function(){
      changeSize(newId);
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function darkenColor(color) {
    const rgba = color.match(/\d+/g);
    const darkerR = Math.floor(rgba[0] * 0.7);
    const darkerG = Math.floor(rgba[1] * 0.7);
    const darkerB = Math.floor(rgba[2] * 0.7);
    return `rgb(${darkerR}, ${darkerG}, ${darkerB})`;
}


  function handleClick() {
    getDimensions();
    document.removeEventListener('scroll', handleScroll);
  }

  function handleScroll() {
    getDimensions();
  }


  function toggleElement(id, dataToggleId) {
    const element = document.querySelector(`[data-toggle-id="${dataToggleId}"]`);
    const button=document.getElementById(id);
    if (element.style.display === "none") {
      button.textContent = `Сховати`;
        element.style.display = "block";
    } else {
      button.textContent = `Показати`;
        element.style.display = "none";
    }
}

function addButton() {
    const newB = document.createElement('button');
    const newId = `toggle-cont`;
    newB.setAttribute('id', newId);
    newB.textContent = `Сховати`;
    const cont = document.getElementById('container');
    cont.setAttribute('data-toggle-id', 'container');
    const bod = cont.parentElement;
    bod.insertBefore(newB, cont);
    newB.addEventListener("click", function () {

        toggleElement(newId, cont.getAttribute('data-toggle-id'));
    });

    const newB2 = document.createElement('button');
    const newId2 = `toggle-data`;
    newB2.setAttribute('id', newId2);
    newB2.textContent = `Сховати`;
    const data = document.getElementById('blockInfo');
    data.setAttribute('data-toggle-id', 'block-info');
    const dd = data.parentElement;
    dd.insertBefore(newB2, data);
    newB2.addEventListener("click", function () {
        toggleElement(newId2, data.getAttribute('data-toggle-id'));
    });
    document.getElementById('toggle').style.display = "none";
}




  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('getDimensionsBtn').addEventListener('click', getDimensions);
    document.getElementById('addElement').addEventListener('click', addElement);
    document.getElementById('toggle').addEventListener('click',addButton);
    document.getElementById('block1').addEventListener('click', function () { changeSize('block1')});
    document.getElementById('block2').addEventListener('click', function () { changeSize('block2')});
    document.getElementById('block3').addEventListener('click', function () { changeSize('block3')});
});


  document.addEventListener('scroll', handleScroll);
