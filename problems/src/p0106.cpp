#include <iostream>

int multiply(int, int);

int main()
{
    std::cout << "Product: " << multiply(3, 4) << '\n';
    return 0;
}

int multiply(int a, int b)
{
    return a * b;
}
