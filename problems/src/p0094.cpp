#include <iostream>

int main()
{
    int x{ 10 };
    std::cout << x << '\n';

    {
        int x{ 20 };
        int y{ 30 };
        std::cout << x << ' ' << y << '\n';
    }

    std::cout << x << '\n';
}
