export const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px solid #F4F4F4",
    color: state.isSelected ? "white" : "black",
    padding: 10,
    backgroundColor: state.isSelected ? "#F05050" : "white",
  }),
  control: (provided) => ({
    ...provided,
    height: "50px",
    width: "100%",
    paddingLeft: 3,
    paddingRight: 0,
    borderRadius: 0,
    border: "2px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "25px",
    color: "#212121",
    font: "root.font.regular",
    marginTop: 1,
    boxShadow: "0 !important",
    "&:hover": {
      outline: "none !important",
      borderColor: "#F05050",
    },
    "&:focus": {
      // outline: "auto 2px Highlight !important",
      borderColor: "#F05050",
    },
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};
