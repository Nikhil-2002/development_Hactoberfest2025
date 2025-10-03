console.log('Helloworld!')

const calculateTemp = () => {

    const numberTemp = document.getElementById('temp').value;
    console.log(numberTemp);
    // prompt(numberTemp);

    const tempSelected = document.getAnimations('temp_diff');
    const valueTemp = temp_diff.options[tempSelected.selectedIndex].value;
    console.log(valueTemp);
    prompt(valueTemp);

    const celToFah = (cel) => {
        let fahrenheit = Math.round((cel * 9 / 5) + 32)
        return fahrenheit;

    }

    const fahToCel = (fehr) => {
        let celcius = Math.round((fehr - 32) * 5 / 9);
        return celcius;
    }




    let result;

    if (valueTemp == 'cel') {
        result = celToFah(numberTemp);
        document.getElementById('resultContainer').innerHTML = `= ${result}Celsius`;
    } else {
        result = fahToCel(numberTemp);
        document.getElementById('resultContainer').innerHTML = `= ${result}Celsius`;
    }
}