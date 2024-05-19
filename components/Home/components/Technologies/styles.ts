export const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "50px",
    paddingBottom: "50px",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
  },
  text: {
    padding: "5px",
    display: "flex",
    justifyContent: "center",
  },
  tabs: {
    display: "flex",
    marginTop: "25px",
    marginBottom: "30px",
    "& .MuiTab-root.Mui-selected": {
      color: "secondary.contrastText",
    },
  },

  tab: {
    color: "black",
    textTransform: "none",
  },
  tec: {
    display: "flex",
    alignItems: "flex-end",
  },
};
