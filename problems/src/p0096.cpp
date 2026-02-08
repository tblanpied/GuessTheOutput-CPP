#include <iostream>

int main()
{
    int x{ 5 };
    std::cout << "x=" << x << '\n';

    {
        int y{ x + 1 };
        std::cout << "y=" << y << '\n';

        x = y + 1;
        std::cout << "x=" << x << '\n';
    }

    std::cout << "x=" << x << '\n';
}
