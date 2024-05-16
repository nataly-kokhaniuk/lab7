function createTabs(tabNode) {
    const buttons = tabNode.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');
  
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tabname');
        // Hide all tab contents
        contents.forEach(content => {
          if (content.getAttribute('data-tabname') === tabName) {
            content.style.display = 'block';
          } else {
            content.style.display = 'none';
          }
        });
        // Remove 'active' class from all buttons
        buttons.forEach(btn => btn.classList.remove('active'));
        // Add 'active' class to the clicked button
        button.classList.add('active');
      });
    });
  }
  
  // Call createTabs function with the tabs container node
  createTabs(document.getElementById('tabs'));