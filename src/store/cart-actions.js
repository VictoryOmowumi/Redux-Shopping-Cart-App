import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";
export const fetchData = () => {
    return async (dispatch) => {
        const fetchHandler = async () => {
            const res = await fetch(
                "https://redux-74784-default-rtdb.firebaseio.com/cartItems.json"
            )
            const data = await res.json();
            return data;
        }
        try {
            const cartData = await fetchHandler();
            dispatch(
                cartActions.replaceCart(cartData)
            );
        } catch (err) {
            dispatch(
                uiActions.showNotification({
                    open: true,
                    message: "Fetching Data Failed",
                    type: "error",
                })
            );
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending Request To Database!",
          type: "warning",
        })
      );
      const sendRequest = async () => {
        // Send state as Sending request
  
        const res = await fetch(
          "https://redux-74784-default-rtdb.firebaseio.com/cartItems.json",
          {
            method: "PUT",
            body: JSON.stringify(cart),
          }
        );
        const data = await res.json();
        
        // Send state as Request is successful
        dispatch(
          uiActions.showNotification({
            open: true,
            message: "Request Sent Successfully!!",
            type: "success",
          })
        );
      };
      try {
        await sendRequest();
      } catch (err) {
        dispatch(
          uiActions.showNotification({
            open: true,
            message: "Sending Request Failed",
            type: "error",
          })
        );
      }
    };
  };