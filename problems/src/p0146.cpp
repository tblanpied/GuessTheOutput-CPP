#include <iostream>

int main()
{
    double a{ 1e2 };
    double b{ 1E2 };

    std::cout << (a == b) << '\n';
    std::cout << (a + b + 1) << '\n';
    return 0;
}
