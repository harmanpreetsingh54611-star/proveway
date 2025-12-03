        // Get all pricing boxes
        const pricingBoxes = document.querySelectorAll('.pricing-box');
        const radioInputs = document.querySelectorAll('.radio-input');
        const totalDisplay = document.querySelector('.total-price');

        let selectedBox = null;

        // Initialize event listeners
        function initializeBoxes() {
            pricingBoxes.forEach((box, index) => {
                const radio = box.querySelector('.radio-input');
                const boxNumber = box.dataset.box;

                // Click handler for expanding/collapsing
                box.addEventListener('click', function(e) {
                    // Prevent radio selection from triggering expansion
                    if (e.target === radio) {
                        e.stopPropagation();
                    }

                    // Toggle expanded state
                    const isExpanded = this.classList.contains('expanded');
                    
                    // Collapse all boxes
                    pricingBoxes.forEach(b => b.classList.remove('expanded'));

                    // Expand clicked box if it wasn't expanded
                    if (!isExpanded) {
                        this.classList.add('expanded');
                    }
                });

                // Radio input selection
                radio.addEventListener('click', function(e) {
                    e.stopPropagation();
                    selectBox(index);
                });
            });
        }

        // Handle box selection
        function selectBox(index) {
            selectedBox = index;

            // Update radio buttons
            radioInputs.forEach((radio, i) => {
                if (i === index) {
                    radio.classList.add('checked');
                } else {
                    radio.classList.remove('checked');
                }
            });

            // Update total price
            const selectedPriceText = pricingBoxes[index].querySelector('.current-price').textContent;
            totalDisplay.textContent = `Total: ${selectedPriceText}`;
        }

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function() {
            initializeBoxes();
            // Select the second box (most popular) by default
            selectBox(1);
            pricingBoxes[1].classList.add('expanded');
        });

        // Handle add to cart click
        document.querySelector('.add-to-cart-btn').addEventListener('click', function() {
            if (selectedBox !== null) {
                alert(`Box ${selectedBox + 1} added to cart!`);
            } else {
                alert('Please select an option');
            }
        });
