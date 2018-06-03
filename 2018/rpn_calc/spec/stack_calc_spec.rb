require './stack_calc.rb'

describe "逆ポーランド記法計算" do
  context "単純な四則演算" do
    it "足し算の結果が正しいこと" do
      rpn = ReversePolishNotationCalculator.new("1 1 +")
      expect(rpn.calc).to eq(2)
    end

    it "引き算の結果が正しいこと" do
      rpn = ReversePolishNotationCalculator.new("5 3 -")
      expect(rpn.calc).to eq(2)
    end

    it "かけ算の結果が正しいこと" do
      rpn = ReversePolishNotationCalculator.new("3 7 *")
      expect(rpn.calc).to eq(21)
    end

    it "割り算の結果が正しいこと" do
      rpn = ReversePolishNotationCalculator.new("21 8 /")
      expect(rpn.calc).to eq(2)
    end
  end

  context "複雑な四則演算" do
    describe "同じ演算子の組み合わせ" do
      it "複数の足し算の結果が正しいこと" do
        rpn = ReversePolishNotationCalculator.new("1 2 + 3 +")
        expect(rpn.calc).to eq(6)
      end

      it "複数の引き算の結果が正しいこと" do
        rpn = ReversePolishNotationCalculator.new("12 6 - 3 -")
        expect(rpn.calc).to eq(3)
      end

      it "複数のかけ算の結果が正しいこと" do
        rpn = ReversePolishNotationCalculator.new("4 3 * 4 *")
        expect(rpn.calc).to eq(48)
      end

      it "複数の割り算の結果が正しいこと" do
        rpn = ReversePolishNotationCalculator.new("81 9 / 3 /")
        expect(rpn.calc).to eq(3)
      end
    end

    describe "複数の演算子の組み合わせ" do
      it "足し算とかけ算の組み合わせた計算の結果が正しいこと" do
        rpn = ReversePolishNotationCalculator.new("1 2 + 4 5 + *")
        expect(rpn.calc).to eq(27)
      end

      it "足し算とかけ算を組み合わせた計算の結果が正しいこと" do
        rpn = ReversePolishNotationCalculator.new("1 2 + 4 5 + *")
        expect(rpn.calc).to eq(27)
      end
    end
  end
end

