export default class Calculation {
  public validExpressionRegex: RegExp = /^(?!.*[+\-*/%]{2})(?!.*\d\s*\()(?!.*[\s+\-*/%.(]$)[0-9+\-*/%.()\s]*$/;
  private expression: string;
  constructor(expression: string) {
    this.expression = expression;
  }

  isValidExpression(expression: string): boolean {
  return this.validExpressionRegex.test(expression);
  }

  hasBalancedParentheses(expression: string): boolean {
    let openCount = 0;
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
      if (char === '(') {
        openCount++;
      } else if (char === ')') {
        openCount--;
      }
      if (openCount < 0) {
        return false; 
      }
    }
    return openCount === 0; 
  }

  calculate(tokens?: string[]): number | undefined {
    if (!this.isValidExpression(this.expression)) {
        return undefined;
    }
    
    if (!this.hasBalancedParentheses(this.expression)) {
      return undefined;
    }
    if (!tokens) {
      const matched = this.expression.match(/(?:\d+(?:\.\d+)?|[()+\-*/%])/g);
      if (!matched) return undefined;
      tokens = matched;
    }

    const stack: number[] = [];
    let operator = '+';

    while (tokens.length > 0) {
      let token = tokens.shift();
      if (!token) break;

      // Handle nested expressions inside parentheses
      if (token === '(') {
        const nestedTokens: string[] = [];
        let parenCount = 1;

        while (tokens.length > 0) {
          const nextToken = tokens.shift();
          if (nextToken === '(') parenCount++;
          else if (nextToken === ')') parenCount--;
          if (parenCount === 0) break;
          nestedTokens.push(nextToken!);
        }

        const nestedResult = this.calculate(nestedTokens);
        if (nestedResult === undefined) return undefined;
        token = nestedResult.toString();
      }

      // Process numbers
      if (!isNaN(Number(token))) {
        const num = Number(token);
        switch (operator) {
          case '+': stack.push(num); break;
          case '-': stack.push(-num); break;
          case '*': stack.push((stack.pop() ?? 0) * num); break;
          case '/':
            if (num === 0) return undefined;
            stack.push((stack.pop() ?? 0) / num);
            break;
          case '%':
            if (num === 0) return undefined;
            stack.push((stack.pop() ?? 0) % num);
            break;
        }
      } else {
        operator = token;
      }
    }

    return stack.reduce((a, b) => a + b, 0);
  }
}
