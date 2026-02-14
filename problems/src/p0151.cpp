#include <iomanip>
#include <iostream>

int main()
{
    double v{ 0.1 };

    std::cout << v << '\n';
    std::cout << std::setprecision(17);
    std::cout << v << '\n';

    return 0;
}
