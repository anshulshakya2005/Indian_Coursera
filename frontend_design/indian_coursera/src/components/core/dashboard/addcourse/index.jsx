import Randersteps from "./randersteps";

function Addcourse() {
  return (
    <div className="mx-auto flex w-11/12 max-w-[1200px] gap-10 py-10 text-white">

      {/* LEFT SIDE */}
      <div className="flex-1">
        <h1 className="mb-8 text-3xl font-semibold">
          Add Course
        </h1>

        <Randersteps />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-[320px]">
        <div className="rounded-lg border border-richblack-700 bg-richblack-800 p-6">

          <h2 className="mb-5 text-lg font-semibold text-richblack-5">
            ⚡ Course Upload Tips
          </h2>

          <ul className="list-disc space-y-3 pl-5 text-sm text-richblack-300">
            <li>Set the course price option or make it free.</li>
            <li>Standard size for thumbnail is 1024 × 576.</li>
            <li>Video section controls course lectures.</li>
            <li>Upload high quality thumbnails.</li>
            <li>Keep course titles short and descriptive.</li>
            <li>Add complete course details before publishing.</li>
            <li>Arrange lectures section-wise.</li>
            <li>Preview before making course public.</li>
          </ul>

        </div>
      </div>
    </div>
  );
}

export default Addcourse;