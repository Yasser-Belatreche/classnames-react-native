import {
  FlexStyle,
  TextStyle,
  ViewStyle,
  ImageStyle,
  StatusBarStyle,
  TransformsStyle,
  TextStyleAndroid,
  TextStyleIOS,
} from 'react-native';

type RNStyles =
  | FlexStyle
  | TextStyle
  | ViewStyle
  | ImageStyle
  | StatusBarStyle
  | TransformsStyle
  | TextStyleAndroid
  | TextStyleIOS;

type Arguments<T extends string> = Array<T | Partial<Record<T, any>>>;

function stylesOf<T extends string>(baseStylesObject: Record<T, RNStyles>) {
  return (...args: Arguments<T>): RNStyles | Array<RNStyles> => {
    if (thereIsJustOneStringIn(args)) return baseStylesObject[args[0]];

    const styles: RNStyles[] = [];

    for (const arg of args) {
      if (isString(arg)) styles.push(baseStylesObject[arg]);
      else if (isObject(arg))
        for (const [key, value] of Object.entries(arg))
          if (isTruthy(value)) styles.push(baseStylesObject[key as T]);
    }

    return styles;
  };
}

const thereIsJustOneStringIn = (args: Array<any>): boolean => {
  return args.length === 1 && typeof args[0] === 'string';
};

const isObject = (arg: any) => {
  return typeof arg === 'object';
};

const isString = (arg: any) => {
  return typeof arg === 'string';
};

const isTruthy = (value: any) => {
  return !!value;
};

export { stylesOf };
