import { useState, useEffect } from "react";
import { AppState } from "./state/appStateReducer";
import { load } from "./api";

/**
 * Define a type that will represent the props that we are injecting
 */
type InjectedProps = {
  initialState: AppState;
};

/**
 * @ utility type Omit allows us to create a new type that won’t have
 *   the keys of the InjectedProps type.
 * @ utility type Omit constructs a new type removing the keys that you provide to it
 * @ The query 'keyOf':  returns a union type that contains 
     the keys of the type that you pass to it
 */
type PropsWithoutInjected<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>;

/**
 * HOC (High Order Component) COMPONENT
 * Function that accepts a 'WrappedComponent' argument.
 * @param WrappedComponent
 * @returns
 */
export function withInitialState<TProps>(
  WrappedComponent: React.ComponentType<
    PropsWithoutInjected<TProps> & InjectedProps
  >
) {
  return (props: PropsWithoutInjected<TProps>) => {
    //
    const [initialState, setInitialState] = useState<AppState>({
      lists: [],
      draggedItem: null,
    });
    //
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>();

    //
    useEffect(() => {
      const fetchInitialState = async () => {
        try {
          const data = await load();
          setInitialState(data);
        } catch (e: any) {
          setError(e);
        }
        setIsLoading(false);
      };
      //
      fetchInitialState();
    }, []);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{error.message}</div>;
    }

    return <WrappedComponent {...props} initialState={initialState} />;
  };
}
