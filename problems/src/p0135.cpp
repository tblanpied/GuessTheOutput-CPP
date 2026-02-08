#include <cstdint>
#include <iostream>

void show(std::uint32_t x)
{
    std::cout << x << '\n';
}

int main()
{
    show(-1);
    show(5);

    return 0;
}
