#include <iomanip>
#include <iostream>

int main()
{
    float f{ 16777217.0f };

    std::cout << std::fixed << std::setprecision(0);
    std::cout << f << '\n';

    return 0;
}
