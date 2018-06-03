## 逆ポーランド記法計算サンプル

 * [逆ポーランド記法](https://ja.wikipedia.org/wiki/逆ポーランド記法)(Wikipedia)

### 実行例

#### 計算の例

```
$ ./stack_calc.rb "1 5 + 2 3 + *"
30
```

#### RSpec

```
$ bundle install --path vendor/bundle
$ bundle exec rspec spec/stack_calc_spec.rb
```

