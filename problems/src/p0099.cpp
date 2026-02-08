#include <iostream>

int main()
{
    {
        int x{ 42 };
        std::cout << x << '\n';
    }

    std::cout << x << '\n';
}
