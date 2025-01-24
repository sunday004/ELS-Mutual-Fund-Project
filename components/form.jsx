const element = (
<form action="/get-beta" method="POST" class="flex flex-wrap gap-4 items-center">
          
          
<div >
    <label for="fundkey">Mutual Fund</label>
    
    <select name="fundKey" required class="w-32rem px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
        <option value="VSMPX">VSMPX - Vanguard Total Stock Market Index Fund</option>
        <option value="FXAIX">FXAIX - Fidelity 500 Index Fund</option>
        <option value="VFIAX">VFIAX - Vanguard 500 Index Fund</option>
        <option value="VTSAX">VTSAX - Vanguard Total Stock Market Index Fund</option>
        <option value="SPAXX">SPAXX - Fidelity Government Money Market Fund</option>
    </select>
   
</div>
<div >
    <label for="field1">Initial Payment</label>
    
    <input type="text" name="field1" placeholder="Enter Field 1" required class="w-32rem px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></input>
   
</div>
<div >
    <label for="field2">Investment Duration</label>
    
    <input type="text" name="field2" placeholder="Enter Field 2" required class="w-32rem px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></input>
   
</div>
<button type="submit" class="w-1/4 bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
    Get Beta Value
</button>
</form>);