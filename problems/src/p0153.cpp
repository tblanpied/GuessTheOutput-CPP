#include <iomanip>
#include <iostream>

int main()
{
    std::cout << std::fixed << std::setprecision(1);

    double a{ 1.0 / 2.0 };
    double b{ 1.0 / 3.0 };

    std::cout << a << '\n';
    std::cout << b << '\n';

    return 0;
}
