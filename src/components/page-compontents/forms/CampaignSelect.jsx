/* eslint-disable react/prop-types */


function CampaignSelect({campaigns = ['No campaigns available']}, rowStart=5) {
  return (
    <label className={`flex flex-col row-start-${rowStart} row-span-2 col-start-2 col-span-6`}>
        <span className="roboto-medium">Campaign:</span>
        <select 
        id="campaigns" 
        className="px-2 w-full h-4/5  outline-mylightgreen-300 outline-offset-2 outline-4 border border-mygreen-300 rounded-md"
        placeholder="product+campaign. eg: FAESgrubUpselling"
        >
        {
            campaigns.map((campaign, index) => {
                return <option key={index} className="">{campaign}</option>
            })
        }
            
        </select>

    </label>
  )
}

export default CampaignSelect