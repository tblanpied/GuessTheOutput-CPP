#include <iostream>

int main()
{
    double v{ 3.7 };

    std::cout << static_cast<int>(v) << '\n';
    std::cout << v << '\n';

    return 0;
}
