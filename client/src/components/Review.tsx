import React from "react";

const Review: React.FC<{}> = () => {
  return (
    <>
      <div className=" flex justify-center items-center min-h-screen pb-10">
        <div className="w-8/12 px-10 flex flex-col gap-2 text-gray-900">
          <h1 className="text-lg">Reviews</h1>
          <div className="flex flex-col gap-3 mt-14">
            <div className="flex flex-col gap-4 py-4">
              <div className="flex justify justify-between">
                <div className="flex gap-2">
                  <div className="w-7 h-7 text-center rounded-full bg-red-500">
                    J
                  </div>
                  <span>Jess Hopkins</span>
                </div>
                <div className="flex p-1 gap-1 text-orange-300">
                  {/* <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star-half"></ion-icon> */}
                </div>
              </div>

              <div>
                Gorgeous design! Even more responsive than the previous version.
                A pleasure to use!
              </div>

              <div className="flex justify-between">
                <span>Feb 13, 2021</span>
                <button className="p-1 px-2 bg-gray-900 hover: border border-gray-950 bg-opacity-60">
                  Share
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 py-4">
              <div className="flex justify justify-between">
                <div className="flex gap-2">
                  <div className="w-7 h-7 text-center rounded-full bg-yellow-500">
                    A
                  </div>
                  <span>Alice Banks</span>
                </div>
                <div className="flex p-1 gap-1 text-orange-300"></div>
              </div>

              <div>
                The device has a clean design and the metal housing feels sturdy
                in my hands. Soft rounded corners make it a pleasure to look at.
              </div>

              <div className="flex justify-between">
                <span>Feb 13, 2021</span>
                <button className="p-1 px-2 bg-gray-900 hover: border border-gray-950 bg-opacity-60">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"></script>
    </>
  );
};

export default Review;
