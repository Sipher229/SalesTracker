import GoalCard from "./GoalCard"
import ReportCard from "./ReportCard"
import StatsGraph from "./StatsGraph"

function MainBody() {
  return (
    <>
        <div className="w-full h-full grid grid-cols-12 bg-fadedGrayBg gap-3 grid-rows-12">
            <div className="col-start-2 col-span-5 row-start-2 row-span-4">
                <GoalCard />
            </div>
            <div className="col-start-7 col-end-12 row-start-2 row-span-4">
                <ReportCard />
            </div>
            <div className="col-start-2 col-span-10 row-start-6 row-end-12">
                <StatsGraph />
            </div>

        </div>
    </>
  )
}

export default MainBody