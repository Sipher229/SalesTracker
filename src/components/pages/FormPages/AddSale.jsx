import SaleForm from "../../page-compontents/forms/SaleForm"
function AddSale() {
  return (
    <>
      <div className="grid w-full h-full grid-cols-12 grid-rows-12 gap-3 bg-fadedGrayBg overflow-y-scroll">
      <h1 className="roboto-bold text-2xl p-1 text-center col-start-3 col-end-10 row-start-1 row-span-2">Add/Edit Sale</h1>
        <div className="row-start-2 row-end-12 col-start-3 col-end-10">
          <SaleForm />

        </div>
      </div>
    </>
  )
}

export default AddSale