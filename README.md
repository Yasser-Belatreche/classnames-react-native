# Classnames React Native

This is a react native version of the favorite [classnames](https://www.npmjs.com/package/classnames) package.

It's a javascript utility for conditionally joining styles together.

install via [npm](https://www.npmjs.com/)

```bash
npm install classnames-rn
```

## Usage

The `stylesOf` function takes the styles object returned from `StyleSheet.create`, or any normal object with key/value pair, where the value is a react native styles object, and return another function that takes any number of arguments of type string or object.

## Examples

```tsx
import { stylesOf } from 'classnames-rn';

const styles = StyleSheet.create({
  ...
  container: {
    flex: 1,
    alignItems: 'center',
  },
  ...
})

const st = stylesOf(styles);


const Component = () => {
  return (
    // this will return { flex: 1, alignItems: 'center' } 
    <View style={st("container")}> 
      ...
    </View>
  )
}
```

You can use it with objects conditionally to make the code more readable

### Before

```tsx
const styles = StyleSheet.create({
  ...
  button: {
    // some styles
  },

  disabled: {
    opacity: 0.3
  },

  active: {
    color: 'yellow'
  }
  ...
})

const Component = () => {
  const [active, setActive] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    // this will return [styles.button] if the disable if false, and [styles.button, styles.disable] if the disabled, and active are true
    <Button style={[styles.button, disabled && styles.disabled, active && styles.active]}> 
      ...
    </Button>
  )
}
```

### After

```tsx
import { stylesOf } from 'classnames-rn';

const styles = StyleSheet.create({
  ...
  button: {
    // some styles
  },

  disabled: {
    opacity: 0.3
  },

  active: {
    color: 'yellow'
  }
  ...
})


const st = stylesOf(styles);

const Component = () => {
  const [active, setActive] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    // this will return same result as before
    <Button style={st("button", { active, disabled })}> 
      ...
    </Button>
  )
}
```
