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
 *
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
      fetchInitialState();
    }, []);

    if (isLoading) {
      return <div>Loading</div>;
    }

    if (error) {
      return <div>{error.message}</div>;
    }

    return <WrappedComponent {...props} initialState={initialState} />;
  };
}
