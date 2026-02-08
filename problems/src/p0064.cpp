#include <iostream>

int main()
{
    int x{ 0 };
    int y{ (x = 3) + 4 };

    std::cout << x << '\n';
    std::cout << y << '\n';

    return 0;
}
