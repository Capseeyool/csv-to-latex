window.onload = () => {
    // elements
    const input = document.getElementById('input')
    const convert = document.getElementById('convert')
    const tab = document.getElementById('tab')
    const output = document.getElementById('output')

    csvToLatex = () => {
        let tabValue
        switch (tab.value) {
            case '2 spaces':
                tabValue = '  '
                break
            case '4 spaces':
                tabValue = '    '
                break
            default:
                tabValue = '\t'
        }

        // parse csv as string to 2d array
        let content = input.value.split('\n').map(i => i.split(','))

        // first line
        let outputValue = '\\begin{tabular}{'
        outputValue += '|c'.repeat(content[0].length)
        outputValue += '|}\n'

        // convert contents
        content.forEach(i => {
            outputValue += `${tabValue}\\hline\n${tabValue}${i.join(' & ')} \\\\\n`
        })

        // lastline
        outputValue += `${tabValue}\\hline\n\\end{tabular}`

        // write to output
        output.value = outputValue
    }

    document.addEventListener('keydown', e => e.ctrlKey && e.key == 'Enter' ? csvToLatex() : null)
    convert.addEventListener('click', csvToLatex)
}