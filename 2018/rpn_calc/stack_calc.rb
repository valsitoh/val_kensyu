#!/usr/bin/env ruby

# 単純なスタックのクラス
class Stack
  def initialize
    @stack = []
  end

  def push(val)
    @stack.push(val)
  end

  def pop
    @stack.pop
  end

  def push_string(str)
    @stack = str.split(' ')
  end

  def get_stack
    return @stack
  end
end

# 逆ポーランド記法での計算を行うクラス
class ReversePolishNotationCalculator
  OPERATOR_SYMBOLS = %w[ + - * / ].freeze # 四則演算の演算子

  def initialize(rpn_str, debug = false)
    @rpn_str = rpn_str
    @stack = Stack.new  # 作業用スタック
    @debug = debug  # デバッグ出力用
  end

  def calc
    @rpn_str.split(' ').each do |token|
      puts "token = #{token}" if @debug

      if OPERATOR_SYMBOLS.include?(token)
        # 文字が演算子なら、作業用スタックから値を取り出し計算する。
        y = @stack.pop.to_i
        x = @stack.pop.to_i

        # 計算した値は作業用スタックにpushする。
        case token
          when '+' then @stack.push(x + y)
          when '-' then @stack.push(x - y)
          when '*' then @stack.push(x * y)
          when '/' then @stack.push(x / y)
        end
      else
        # 文字が演算子でない場合は、そのまま作業用スタックにpushする。
        @stack.push(token)
      end

      puts "stack, token = [#{@stack.get_stack.join(' ')}]" if @debug
      puts "- - - - -" if @debug
    end

    # 数式のスタックが空になった(全部処理された)時点で、
    # 作業用スタックには計算結果の値が入っている。
    return @stack.pop.to_i
  end
end

if __FILE__ == $PROGRAM_NAME
  exit 1 if ARGV.length < 1
  rpn = ReversePolishNotationCalculator.new(ARGV[0], true)
  puts rpn.calc
end

