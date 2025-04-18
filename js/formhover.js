const tabs = document.querySelectorAll('.apply h3');
const companies = document.querySelectorAll(".apply > div")

tabs.forEach((tab, i) => {
    const zoneCompanies = companies[i];

    function showCompanies(){
        zoneCompanies.style.display = 'block';
        tabs[i].style.backgroundColor = 'white';
    }

    function hideCompanies(){
        if (!zoneCompanies.matches(':hover')){
            zoneCompanies.style.display = 'none';
            tabs[i].style.backgroundColor = '#e0e0e0';
        }
    }

    tab.addEventListener('mouseover', showCompanies);
    tab.addEventListener('mouseout', hideCompanies);
    zoneCompanies.addEventListener('mouseover', showCompanies);
    zoneCompanies.addEventListener('mouseout', hideCompanies);
});
