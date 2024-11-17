        // Funktion för att lägga till ett CSS-länk-element dynamiskt
        function addStylesheet(href) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
        }

        // Lägger till FontAwesome, Ionicons och Boxicons
        addStylesheet('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');
        addStylesheet('https://unpkg.com/ionicons@7.1.0/dist/css/ionicons.min.css');
        addStylesheet('https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css');

        console.log("Icon libraries have been dynamically loaded!");