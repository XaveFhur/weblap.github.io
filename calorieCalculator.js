
document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const alapKaveSelect = document.getElementById('alapKave');
    const adalekSelect = document.getElementById('adalek');
    const tejMennyisegInput = document.getElementById('tejMennyiseg');
    const resultDiv = document.getElementById('result');

    // Kalória adatbázis
    const calorieData = {
        // Kávé alapok (kcal/100ml)
        alap: {
            espresso: 10,
            filter: 2,
            americano: 20,
            capuccino: 40
        },
        // Adalékok (kcal/adag)
        adalek: {
            cukor: 16,
            edesszer: 0,
            vanilia: 30,
            karamell: 40
        },
        // Tej (kcal/100ml)
        tej: {
            tejnelkul: 0,
            tej: 62,
            laktozmentestej: 55,
            novenyi: 40
        }
    };

    calculateBtn.addEventListener('click', () => {
        const kaveTipus = alapKaveSelect.value;
        const adalekTipus = adalekSelect.value;
        const tejMennyiseg = parseFloat(tejMennyisegInput.value);
        const tejTipus = document.querySelector('input[name="tejtipus"]:checked').value;

        // Ellenőrzés
        if (!kaveTipus || !adalekTipus || isNaN(tejMennyiseg) || tejMennyiseg < 0 || !tejTipus) {
            resultDiv.innerHTML = '<p class="error-message">Kérlek, tölts ki minden mezőt megfelelően!</p>';
            return;
        }

        // Számítási logika
        let totalCalories = 0;

        // 1. Kávé alap kalória
        totalCalories += calorieData.alap[kaveTipus];
        
        // 2. Adalék kalória
        totalCalories += calorieData.adalek[adalekTipus];

        // 3. Tej kalória
        const tejKaloriaPer100ml = calorieData.tej[tejTipus];
        totalCalories += (tejKaloriaPer100ml / 100) * tejMennyiseg;

        // Eredmény megjelenítése
        resultDiv.innerHTML = `
            <h2>Összes kalória:</h2>
            <h3>${Math.round(totalCalories)} kcal</h3>
            <p>Ez a számítás tájékoztató jellegű.</p>
        `;
    });
});