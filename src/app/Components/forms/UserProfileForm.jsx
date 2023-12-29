import React from "react";

const UserProfileForm = ({ user }) => {
  return (
    <div>
      <form>
        <div className="bg-gray-300 h-32">
          <div className="radio-togglers">
            <label>
              <input type="radio" name="bgType" value="color" />
              <span>Color</span>
            </label>
            <label>
              <input type="radio" name="bgType" value="image" />
              <span>Image</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserProfileForm;
