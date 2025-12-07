document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('orderForm');
    
    // Validálandó mezők
    const nevInput = document.getElementById('nev');
    const emailInput = document.getElementById('email');
    const telefonInput = document.getElementById('telefon');
    const darabInput = document.getElementById('darab');
    const kaveSelect = document.getElementById('kave');
    
    // Segédfüggvény a hibaüzenet megjelenítéséhez
    const setError = (element, message) => {
        const displayError = element.parentElement.querySelector('.error-message');
        displayError.textContent = message;  
    };

    // Segédfüggvény a hibaüzenet eltávolításához
    const clearError = (element) => {
        const displayError = element.parentElement.querySelector('.error-message');
        displayError.textContent = "";  
    };

    const validateInputs = () => {
        let isValid = true;

        // 1. Név validálás (nem lehet üres, min. 5 karakter)
        if (nevInput.value.trim().length < 5) {
            setError(nevInput, 'A név túl rövid (min. 5 karakter).');
            isValid = false;
        } else {
            clearError(nevInput, "");
        }

        // 2. Email validálás (nem lehet üres, tartalmaznia kell @ és .)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            setError(emailInput, 'Érvénytelen e-mail formátum.');
            isValid = false;
        } else {
            clearError(emailInput, "");
        }

        // 3. Telefonszám (+36)
        const telefonValue = telefonInput.value.trim();
        if (telefonValue === "") {
            setError(telefonInput, 'A telefonszám megadása kötelező.');
            isValid = false;
        } else if (!telefonValue.startsWith('+36')) { 
            setError(telefonInput, 'A telefonszámnak a +36 nemzetközi előhívóval kell kezdődnie.'); 
            isValid = false;
        } else {
        // 3.2. Hossz ellenőrzés
        // Előtte eltávolítjuk a szóközöket és kötőjeleket, hogy csak a számjegyeket és a + jelet számoljuk
            const cleanedPhone = telefonValue.replace(/[\s-]/g, '');
            const minLength = 11;
            const maxLength = 13;

            if (cleanedPhone.length < minLength || cleanedPhone.length > maxLength) {
                setError(telefonInput, `A telefonszámnak ${minLength} és ${maxLength} karakter között kell lennie.`);
                isValid = false;
            } else {
                clearError(telefonInput);
            }
        }
        // 4. Darabszám validálás (min. 1)
        const darabValue = parseInt(darabInput.value);
        if (isNaN(darabValue) || darabValue < 1) {
            setError(darabInput, 'A darabszám minimum 1 lehet.');
            isValid = false;
        } else {
            clearError(darabInput);
        }

        // 5. Kávé Típus validálás (ki kell választani)
        if (kaveSelect.value === "") {
            setError(kaveSelect, 'Válassz egy kávé típust.');
            isValid = false;
        } else {
            clearError(kaveSelect);
        }
        return isValid;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Megakadályozza az alapértelmezett elküldést

        if (validateInputs()) {
            alert('A rendelés sikeresen elküldve! Köszönjük!');
            // form.submit();
            form.reset();
        } else {
            alert('Kérlek, javítsd a hibákat a megjelölt mezőkben!');
        }
    });
});
